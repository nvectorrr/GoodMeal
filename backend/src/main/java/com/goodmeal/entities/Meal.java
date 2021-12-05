package com.goodmeal.entities;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@JsonApiResource(type = "meal")
@Entity
@Table(name = "Meals", schema="goodmeal")
@Getter
@Setter
public class Meal {
    public static final String DEFAULT_NAME = "No meal type";

    @Id
    @JsonApiId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String type;

    @OneToMany(mappedBy = "meal")
    private Set<Recipe> recipes;

    public Meal(String type) {
        this.type = type;
    }

    public Meal(){};
}