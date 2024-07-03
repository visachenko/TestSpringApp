package ru.tdpyramid.testspringapp.service;

import org.springframework.stereotype.Service;
import ru.tdpyramid.testspringapp.model.AnimalModel;
import ru.tdpyramid.testspringapp.repository.AnimalsRepository;

import java.util.Optional;

@Service
public class AnimalsService {
    private final AnimalsRepository animalsRepository;

    public AnimalsService(AnimalsRepository animalsRepository) {
        this.animalsRepository = animalsRepository;
    }

    public AnimalModel add(AnimalModel animal) {
        return animalsRepository.save(animal);
    }

    public Iterable<AnimalModel> getAll() {
        return animalsRepository.findAll();
    }

    public void remove(long id) {
        animalsRepository.deleteById(id);
    }

    public Optional<AnimalModel> get(long id) {
        return animalsRepository.findById(id);
    }

    public AnimalModel update(AnimalModel animal) {
        return animalsRepository.save(animal);
    }
}
