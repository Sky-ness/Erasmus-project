DROP Table if exists olivetrees;
Create Table olivetrees(
    id text NOT NULL PRIMARY KEY,
    treeCode text NOT NULL,
    longitude text,
    latitude text,
    nisi int,
    perim_at_1m30 float,
    base_perimeter float,
    height float,
    branch float,
    number_of_branches float,
    cavitation int,
    trunk_shapes int,
    trunk_torsion int,
    land_use text,
    paratiriseis text
);