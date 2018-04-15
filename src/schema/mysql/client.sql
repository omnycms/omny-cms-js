CREATE TABLE IF NOT EXISTS menus(
    menu_id CHAR(16) NOT NULL,
    data JSON,

    PRIMARY KEY(menu_id)
);

CREATE TABLE IF NOT EXISTS pages(
    page_id CHAR(16) NOT NULL,
    data JSON,

    PRIMARY KEY(page_id)
);

CREATE TABLE IF NOT EXISTS page_cache(
    page_id CHAR(16) NOT NULL,
    page_version CHAR(16) NOT NULL,
    page_data TEXT,

    PRIMARY KEY(page_id)
);

CREATE TABLE IF NOT EXISTS page_routes(
    page_id CHAR(16) NOT NULL,
    pattern varchar(200),
    is_prefix int,

    PRIMARY KEY(pattern, page_id),
    INDEX page_routes_is_prefix (pattern, is_prefix)
);

CREATE TABLE IF NOT EXISTS site_info(
    site_version CHAR(16),

    PRIMARY KEY(site_version)
);

