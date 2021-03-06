package com.goodmeal.entities;

import io.crnk.core.resource.annotations.JsonApiId;
import io.crnk.core.resource.annotations.JsonApiResource;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@JsonApiResource(type = "user")
@Entity
@Table(name = "Users", schema = "goodmeal")
@Getter
@Setter
public class User {

    @Id
    @JsonApiId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String login;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private String surname;

    @Column
    private String email;

    @Column
    private Date bday;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles", schema = "goodmeal",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roleSet = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Selection> selectionSet = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<RecipesRating> userGradingsSet;

    public User(String login, String password, String name, String surname, String email, Date bday, Set<Role> roleSet, Set<Selection> selectionSet) {
        this.login = login;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.bday = bday;
        this.roleSet = roleSet;
        this.selectionSet = selectionSet;
    }

    public User() {}
}