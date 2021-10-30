package com.goodmeal.repositoriesImplementations;

import com.goodmeal.entities.IngridientsToRecipes;
import com.goodmeal.repositories.IngridientsToRecipesRepository;
import io.crnk.data.jpa.JpaEntityRepositoryBase;
import org.springframework.stereotype.Component;

@Component
public class IngridientsToRecipesRepositoryImplementation extends JpaEntityRepositoryBase<IngridientsToRecipes, Long> implements IngridientsToRecipesRepository {

    public IngridientsToRecipesRepositoryImplementation() { super(IngridientsToRecipes.class); }

}