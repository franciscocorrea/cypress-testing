describe("Testing API", () => {
  it("Visit api and make request ping, api response with 200 and send pong message reponse", () => {
    cy.request("GET", "/api/ping").its("status").should("eq", 200);
    cy.request("GET", "/api/ping").its("body").should("eq", "PONG!");
  });

  it("Make Request Get field", () => {
    cy.request("GET", "/api/fields/60e38180faa0375798b34428")
      .its("body")
      .should((body) => {
        expect(body).to.have.property("feature");
        expect(body.feature).to.have.property("type", "Figura");
        expect(body.feature).to.have.property("properties");
        expect(body.feature.properties).to.include.all.keys(
          "id",
          "id_farm",
          "id_field",
          "name_field",
          "geometry_area"
        );
        expect(body.feature).to.have.property("geometry");
        expect(body.feature.geometry).to.have.property("type", "Polygon");
        expect(body.feature.geometry)
          .to.have.property("coordinates")
          .that.is.an("array");
      });
  });
});
