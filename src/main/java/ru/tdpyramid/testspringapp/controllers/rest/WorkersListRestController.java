package ru.tdpyramid.testspringapp.controllers.rest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.tdpyramid.testspringapp.model.WorkerModel;
import ru.tdpyramid.testspringapp.service.WorkersService;

@RestController
@RequestMapping("/api/workersList")
public class WorkersListRestController {
    private final WorkersService workersService;

    public WorkersListRestController(WorkersService workersService) {
        this.workersService = workersService;
    }

    @GetMapping
    public Iterable<WorkerModel> getWorkers(Model model) {
        return workersService.getAll();
    }

    @PostMapping
    public WorkerModel addWorker(@RequestBody WorkerModel worker) {
        return workersService.add(worker);
    }

    @DeleteMapping("/{id}")
    public void removeWorker(@PathVariable Long id) {
        workersService.remove(id);
    }
}
