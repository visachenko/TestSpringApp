package ru.tdpyramid.testspringapp.service;

import org.springframework.stereotype.Service;
import ru.tdpyramid.testspringapp.model.WorkerModel;
import ru.tdpyramid.testspringapp.repository.WorkersRepository;

import java.util.Optional;

@Service
public class WorkersService {
    private final WorkersRepository workersRepository;

    public WorkersService(WorkersRepository workersRepository) {
        this.workersRepository = workersRepository;
    }

    public WorkerModel add(WorkerModel worker) {
        return workersRepository.save(worker);
    }

    public Iterable<WorkerModel> getAll() {
        return workersRepository.findAll();
    }

    public void remove(long id) {
        workersRepository.deleteById(id);
    }

    public Optional<WorkerModel> get(long id) {
        return workersRepository.findById(id);
    }
}
