package ru.tdpyramid.testspringapp.controllers.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.tdpyramid.testspringapp.model.Message;
import ru.tdpyramid.testspringapp.model.WorkerAction;
import ru.tdpyramid.testspringapp.service.WorkerActionService;

@RestController
@RequestMapping("/api/worker")
public class WorkerActionsRestController {
    private final WorkerActionService workerActionService;

    public WorkerActionsRestController(WorkerActionService workerActionService) {
        this.workerActionService = workerActionService;
    }

    @GetMapping
    public ResponseEntity<Message> doAction(
            @RequestParam Long workerId,
            @RequestParam Long animalId,
            @RequestParam WorkerAction action
    ) throws Exception {
        return workerActionService.doAction(workerId, animalId, action);
    }
}
