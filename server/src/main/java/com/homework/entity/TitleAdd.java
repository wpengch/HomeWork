package com.homework.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 田黄雪薇 on 15/5/18.
 */
public class TitleAdd {
    private String content;
    private String description;
    private String initiator;
    private List<AnswerAdd> answers = new ArrayList<>();

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInitiator() {
        return initiator;
    }

    public void setInitiator(String initiator) {
        this.initiator = initiator;
    }

    public List<AnswerAdd> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerAdd> answers) {
        this.answers = answers;
    }

    public class AnswerAdd{
        private String content;
        private Boolean correct;
        private String userId;

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public Boolean isCorrect() {
            return correct;
        }

        public void setCorrect(Boolean correct) {
            this.correct = correct;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }
    }
}
