package ru.tdpyramid.testspringapp.controllers.rest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.tdpyramid.testspringapp.exception.AnimalNotFoundException;
import ru.tdpyramid.testspringapp.model.AnimalModel;
import ru.tdpyramid.testspringapp.service.AnimalsService;

@RestController
@RequestMapping("/animalsList")
public class AnimalsListRestController {
    private final AnimalsService animalsService;

    public AnimalsListRestController(AnimalsService animalsService) {
        this.animalsService = animalsService;
    }

    @GetMapping
    public Iterable<AnimalModel> getWorkers(Model model) {
        return animalsService.getAll();
    }

    @PostMapping
    public AnimalModel addWorker(@RequestBody AnimalModel worker) {
        return animalsService.add(worker);
    }

    @DeleteMapping("/{id}")
    public void removeWorker(@PathVariable("id") Long id) {
        animalsService.remove(id);
    }

    @PutMapping("/{id}")
    public AnimalModel updateAnimal(@PathVariable("id") Long id, @RequestBody AnimalModel requestModel) throws Exception {
        AnimalModel animalModel = animalsService.get(id).orElseThrow(AnimalNotFoundException::new);
        animalModel.setPrisoned(requestModel.isPrisoned());
        return animalsService.update(animalModel);
    }
}
