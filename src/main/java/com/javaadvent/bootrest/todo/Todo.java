package com.javaadvent.bootrest.todo;

import org.springframework.data.annotation.Id;

import static com.javaadvent.bootrest.util.PreCondition.isTrue;
import static com.javaadvent.bootrest.util.PreCondition.notEmpty;
import static com.javaadvent.bootrest.util.PreCondition.notNull;
import java.util.Date;
/**
 * @author Petri Kainulainen
 */
final class Todo {

    static final int MAX_LENGTH_DESCRIPTION = 500;
    static final int MAX_LENGTH_TITLE = 100;

    @Id
    private String id;

    private String description;

    private String title;

    private Date now = new Date();

    public Todo() {}

    private Todo(Builder builder) {
        this.description = builder.description;
        this.title = builder.title;
        this.now = builder.now;
    }

    static Builder getBuilder() {
        return new Builder();
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getTitle() {
        return title;
    }
    public Date getDate() {
        return now;
    }

    public void update(String title, String description, Date now) {
        checkTitleAndDescription(title, description, now);

        this.title = title;
        this.description = description;
        this.now = now;
    }

    @Override
    public String toString() {
        return String.format(
                "Todo[id=%s, description=%s, title=%s, date=%s]",
                this.id,
                this.description,
                this.title,
                this.now
        );
    }

    /**
     * We don't have to use the builder pattern here because the constructed class has only two String fields.
     * However, I use the builder pattern in this example because it makes the code a bit easier to read.
     */
    static class Builder {

        private String description;

        private String title;

        private Date now;

        private Builder() {}

        Builder description(String description) {
            this.description = description;
            return this;
        }

        Builder title(String title) {
            this.title = title;
            return this;
        }

        Builder now(Date now) {
            this.now = now;
            return this;
        }

        Todo build() {
            Todo build = new Todo(this);

            build.checkTitleAndDescription(build.getTitle(), build.getDescription(), build.getDate());

            return build;
        }
    }

    private void checkTitleAndDescription(String title, String description, Date now) {
        notNull(title, "Title cannot be null");
        notEmpty(title, "Title cannot be empty");
        isTrue(title.length() <= MAX_LENGTH_TITLE,
                "Title cannot be longer than %d characters",
                MAX_LENGTH_TITLE
        );

        if (description != null) {
            isTrue(description.length() <= MAX_LENGTH_DESCRIPTION,
                    "Description cannot be longer than %d characters",
                    MAX_LENGTH_DESCRIPTION
            );
        }
    }
}
