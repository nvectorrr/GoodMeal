package com.goodmeal.entities;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@JsonApiResource(type = "dish")
@Table(name = "Dishes", schema = "goodmeal")
public class Dish {

    public static final String DEFAULT_NAME = "No dish type";

    @Id
    @JsonApiId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String type;

    @OneToMany(mappedBy = "dish")
    private Set<Recipe> recipes = new HashSet<>();

    public Dish(String type) {
        this.type = type;
    }

    public Dish() {};
}
