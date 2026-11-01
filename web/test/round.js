import { expect } from "chai";
import { readFileSync } from "fs";
import CardSet from "../src/types/card/CardSet.js";
import Round from "../src/types/card/Round.js";
import { BiDate } from "../src/types/BiDate.js";

describe("Round", () => {
  function set(name, rough, released = true, exact = null) {
    return {
      name,
      exitDate: new BiDate(rough, exact),
      hasEntered: () => released,
    };
  }

  it("orders rotation groups by exit date, preserving sets within each group", () => {
    const foundations = set("Foundations", "Q1 2030");
    const lorwyn = set("Lorwyn Eclipsed", "Q1 2029");
    const nauctis = set("Nauctis", "Q1 2030", false);
    const sets = [foundations, lorwyn, nauctis];

    const rounds = Round.ify(sets);

    expect(rounds.map((round) => round.exitDate.rough)).to.deep.equal([
      "Q1 2029",
      "Q1 2030",
    ]);
    expect(rounds[1].sets).to.deep.equal([foundations, nauctis]);
    expect(sets).to.deep.equal([foundations, lorwyn, nauctis]);
  });

  it("sorts exact dates and quarters chronologically rather than alphabetically", () => {
    const rounds = Round.ify([
      set("Later year", "Q1 2030"),
      set("Later quarter", "Q4 2029"),
      set("Exact date", "Q2 2029", true, "2029-04-01T00:00:00.000"),
    ]);

    expect(rounds.map((round) => round.sets[0].name)).to.deep.equal([
      "Exact date",
      "Later quarter",
      "Later year",
    ]);
    expect(Round.ify([])).to.deep.equal([]);
  });

  it("keeps the first two unreleased rounds in place alongside released rounds", () => {
    const rounds = Round.ify([
      set("Dropped", "Q1 2000", true, "2000-01-01T00:00:00.000"),
      set("Upcoming 1", "Q1 2028", false),
      set("Released", "Q1 2029"),
      set("Upcoming 2", "Q1 2030", false),
      set("Upcoming 3", "Q1 2031", false),
    ]);

    expect(
      Round.relevant(rounds).map((round) => round.exitDate.rough)
    ).to.deep.equal(["Q1 2028", "Q1 2029", "Q1 2030"]);
  });

  it("shows the 2029 section before 2030 with the issue's API data and date", () => {
    const body = JSON.parse(readFileSync("./api/v6/standard.json", "utf8"));
    const now = Date.now;
    Date.now = () => Date.parse("2026-11-01T00:00:00.000Z");
    try {
      const rounds = Round.relevant(
        Round.ify(body.sets.map((json) => new CardSet(json)))
      );
      const dates = rounds.map((round) => round.exitDate.rough);
      expect(dates).to.include("Q1 2029");
      expect(dates).to.include("Q1 2030");
      expect(dates.indexOf("Q1 2029")).to.be.lessThan(dates.indexOf("Q1 2030"));
    } finally {
      Date.now = now;
    }
  });
});
