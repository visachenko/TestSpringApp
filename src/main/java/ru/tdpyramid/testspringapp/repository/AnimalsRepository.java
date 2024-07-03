package ru.tdpyramid.testspringapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.tdpyramid.testspringapp.model.AnimalModel;

@Repository
public interface AnimalsRepository extends CrudRepository<AnimalModel, Long> {
}
