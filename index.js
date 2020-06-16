const express = require("express");
const connection = require("./conf");
const app = express();
const port = 3000;

// Support JSON-encoded bodies
app.use(express.json());
// Support URL-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.send("Hello");
});

app.get("/facts/all", (req, res) => {
  connection.query("SELECT * FROM fact", (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupérations des "facts"');
    } else {
      res.json(results);
    }
  });
});

app.get("/facts/claims-dates", (req, res) => {
  connection.query("SELECT claim, claim_date from fact", (err, results) => {
    if (err) {
      res
        .status(500)
        .send("Erreur lors de la récupérations de ces informations");
    } else {
      res.json(results);
    }
  });
});

app.get("/facts/claim-contain/not", (req, res) => {
  connection.query(
    "SELECT claim from fact WHERE claim LIKE '%not%'",
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send("Erreur lors de la récupérations de ces informations filtrées");
      } else {
        res.json(results);
      }
    }
  );
});

app.get("/facts/claim-begins-with/H", (req, res) => {
  connection.query(
    "SELECT claim from fact WHERE claim LIKE 'H%'",
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send("Erreur lors de la récupérations de ces informations filtrées");
      } else {
        res.json(results);
      }
    }
  );
});

app.get("/facts/claim-dates-after/2010-10-18", (req, res) => {
  connection.query(
    "SELECT claim from fact WHERE claim_date > '2010-10-18'",
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send("Erreur lors de la récupérations de ces informations filtrées");
      } else {
        res.json(results);
      }
    }
  );
});

app.get("/facts/dates-order/:ord", (req, res) => {
  const claimDateOrder = req.params.ord;
  if (claimDateOrder === "asc") {
    connection.query(
      "SELECT claim from fact ORDER BY claim_date ASC",
      [claimDateOrder],
      (err, results) => {
        if (err) {
          res
            .status(500)
            .send(
              "Erreur lors de la récupérations de ces informations filtrées"
            );
        } else {
          res.json(results);
        }
      }
    );
  }
  if (claimDateOrder === "desc") {
    connection.query(
      "SELECT claim from fact ORDER BY claim_date DESC",
      [claimDateOrder],
      (err, results) => {
        if (err) {
          res
            .status(500)
            .send(
              "Erreur lors de la récupérations de ces informations filtrées"
            );
        } else {
          res.json(results);
        }
      }
    );
  }
});

app.post("/facts/all", (req, res) => {
  const formData = req.body;

  connection.query("INSERT INTO fact SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'une fact");
    } else {
      res.sendStatus(200);
    }
  });
});

app.put("/facts/modify/:id", (req, res) => {
  const idFact = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE fact SET ? WHERE id = ?",
    [formData, idFact],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'une fact");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.put("/facts/toggle/:id", (req, res) => {
  const idFact = req.params.id;

  connection.query(
    "UPDATE fact SET fact_checked = !fact_checked WHERE id = ?",
    [idFact],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'une fact");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.delete("/facts/delete/:id", (req, res) => {
  const idFact = req.params.id;

  connection.query("DELETE FROM fact WHERE id = ?", [idFact], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une fact");
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete("/facts/delete_unchecked", (req, res) => {
  connection.query("DELETE FROM fact WHERE `fact_checked` = false", (err) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send("Erreur lors de la suppression des facts non-vérifiées");
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
