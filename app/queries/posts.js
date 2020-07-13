const pool = require("../db/connexion");

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts ORDER BY id ASC', (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    })
};

const getPostByUserid = (request, response) => {
    const userid = parseInt(request.params.userid);

    pool.query(`SELECT * FROM posts WHERE userid = ${userid}`, (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    })
};

const getPostById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`SELECT * FROM posts WHERE id = ${id}`, (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    })
};

const createPost = (request, response) => {
    const { userid, title, body} = request.body;

    pool.query(`INSERT INTO posts (userid, title, body) VALUES ('${userid}', '${title}', '${body}')`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Post added with ID: ${results.insertID}`);
    })
};

const deletePost = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`DELETE FROM posts WHERE id = ${id}`, (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    })
};

const updatePost = (request, response) => {
    const id = parseInt(request.params.id);
    const { userid, title, body} = request.body;

    pool.query(
        'UPDATE posts SET userid = $1, title = $2, body = $3 WHERE id = $4',
        [userid, title, body, id],
        (error) => {
          if (error) {
            throw error
          }
          response.status(200).send(`Posts modified with ID: ${id}`)
        }
      );
    };

    module.exports = {
        getPosts,
        getPostById,
        getPostByUserid,
        createPost,
        deletePost,
        updatePost
    };