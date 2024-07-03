package ru.tdpyramid.testspringapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.tdpyramid.testspringapp.model.WorkerModel;

@Repository
public interface WorkersRepository extends CrudRepository<WorkerModel, Long> {
}
