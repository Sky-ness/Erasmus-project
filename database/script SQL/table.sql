DROP Table if exists oliveTrees;
Create Table olive_trees(
    id_olives_tree text NOT NULL PRIMARY KEY,
    treeCode text,
    longitude text,
    Nisi int,
    Perim_at_1m30 float,
    base_perimeter float,
    Height float,
    number_of_branches int,
    cavitation int,
    trunk_shapes int,
    trunk_torsion int,
    Land_use text,
    Paratiriseis text
);