package ru.tdpyramid.testspringapp;

import ru.tdpyramid.testspringapp.model.Message;
import ru.tdpyramid.testspringapp.model.WorkerAction;

public class MessageUtils {
    public static Message getSuccessMessage(String workerName, String animalName, WorkerAction action) {
        return new Message("Работник " + workerName + " успешно " + getTextByAction(action, animalName));
    }

    public static Message getErrorMessage(String text) {
        return new Message(text);
    }

    private static String getTextByAction(WorkerAction action, String animalName) {
        String text = "";

        switch (action) {
            case FEED_ANIMAL -> text = "покормил " + animalName;
            case CLEAN_PRISON -> text = "почистил клетку для " + animalName;
            case CLEAN_WALK_AREA -> text = "почистил вольер для " + animalName;
        }

        return text;
    }
}
