package ru.tdpyramid.testspringapp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.tdpyramid.testspringapp.MessageUtils;
import ru.tdpyramid.testspringapp.controllers.rest.WorkerActionsRestController;
import ru.tdpyramid.testspringapp.exception.AnimalNotFoundException;
import ru.tdpyramid.testspringapp.exception.WorkerNotFoundException;
import ru.tdpyramid.testspringapp.model.AnimalModel;
import ru.tdpyramid.testspringapp.model.Message;
import ru.tdpyramid.testspringapp.model.WorkerAction;
import ru.tdpyramid.testspringapp.model.WorkerModel;

@Service
public class WorkerActionService {
    private final WorkersService workersService;
    private final AnimalsService animalsService;
    Logger logger = LoggerFactory.getLogger(WorkerActionsRestController.class);

    public WorkerActionService(WorkersService workersService, AnimalsService animalsService) {
        this.workersService = workersService;
        this.animalsService = animalsService;
    }

    public ResponseEntity<Message> doAction(Long workerId, Long animalId, WorkerAction action) throws AnimalNotFoundException, WorkerNotFoundException {
        WorkerModel worker = workersService.get(workerId).orElseThrow(WorkerNotFoundException::new);
        AnimalModel animal = animalsService.get(animalId).orElseThrow(AnimalNotFoundException::new);

        switch (action) {
            case FEED_ANIMAL -> {
                return onActionSuccess(worker.getName(), animal.getName(), action);
            }
            case CLEAN_PRISON, CLEAN_WALK_AREA -> {
                return checkAnimalIsPrisoned(worker, animal, action);
            }
            default -> {
                return ResponseEntity.badRequest().build();
            }
        }
    }

    private ResponseEntity<Message> checkAnimalIsPrisoned(WorkerModel worker, AnimalModel animal, WorkerAction action) {
        boolean needPrison = action == WorkerAction.CLEAN_PRISON;
        if (animal.isPrisoned() != needPrison) {
            return onActionSuccess(worker.getName(), animal.getName(), action);
        } else {
            return onActionFailed();
        }
    }

    private ResponseEntity<Message> onActionFailed() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(MessageUtils.getErrorMessage("Невозможно выполнить операцию. Причина: состояние животного несовместимо"));
    }

    private ResponseEntity<Message> onActionSuccess(String workerName, String animalName, WorkerAction action) {
        logger.info("Работник " + workerName + " сделал операцию " + action + " для животного " + animalName);
        return ResponseEntity.ok(MessageUtils.getSuccessMessage(workerName, animalName, action));
    }
}
