package be.kdg.programming5project.services;

import java.util.List;

public interface EntityService<T> {
    List<T> getAll();
    T getById(long id);
    T add(T t);
    T update(T t);
    void delete(long id);
}
