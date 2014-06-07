
CREATE DATABASE IF NOT EXISTS faStats
CHARACTER SET utf8;

-- ---------------------------------------------------------------------------------------------- --

CREATE TABLE faStats.images (
    id              SERIAL PRIMARY KEY,
    url             VARCHAR(255)    NOT NULL,
    createdDate     DATETIME        NOT NULL,
    lastUpdatedDate DATETIME        NOT NULL
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------------------------------- --

CREATE TABLE faStats.questions (
    id              SERIAL PRIMARY KEY,
    type            ENUM('text', 'number', 'selection', 'boolean') NOT NULL,
    question        VARCHAR(255)    NOT NULL,
    createdDate     DATETIME        NOT NULL,
    lastUpdatedDate DATETIME        NOT NULL
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------------------------------- --

CREATE TABLE faStats.answers (
    id              SERIAL PRIMARY KEY,
    questionId      BIGINT      NOT NULL REFERENCES questions (id),
    createdDate     DATETIME    NOT NULL,
    lastUpdatedDate DATETIME    NOT NULL
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------------------------------- --

CREATE TABLE faStats.imageAnswers (
    imageId     BIGINT          NOT NULL REFERENCES images (id),
    questionId  BIGINT          NOT NULL REFERENCES questions (id),
    answerId    BIGINT              NULL REFERENCES answers (id),
    answer      VARCHAR(255)        NULL,
    createdDate DATETIME        NOT NULL
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------------------------------- --

CREATE TABLE faStats.imageQuestionPriority (
    imageId             BIGINT          NOT NULL REFERENCES images (id),
    questionId          BIGINT          NOT NULL REFERENCES questions (id),
    lastAnsweredDate    DATETIME            NULL,
    answerCount         INT UNSIGNED    NOT NULL DEFAULT 0,
    weight              DOUBLE          NOT NULL DEFAULT 0,
    priority            DOUBLE          NOT NULL DEFAULT 0
) ENGINE=InnoDB;
