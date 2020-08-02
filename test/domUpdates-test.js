import domUpdates from '../src/domUpdates'
import { expect } from "chai";
const chai = require("chai");
let spies = require("chai-spies");
chai.use(spies);


describe("UpdatesToDOM", function () {
  beforeEach(() => {
    global.domUpdates = {};
    chai.spy.on(domUpdates, "displayManagerDashboard", () => {});
    chai.spy.on(domUpdates, "displayGuestDashboard", () => {});
    chai.spy.on(domUpdates, "displayKnownGuests", () => {});
    chai.spy.on(domUpdates, "viewGuestModal", () => {});
    chai.spy.on(domUpdates, "displayAvailableRooms", () => {});
  });

  afterEach(() => {
    chai.spy.restore(domUpdates);
  });

  it("should display manager dashboard on the on DOM after correct login", () => {
    domUpdates.displayManagerDashboard();
    expect(domUpdates.displayManagerDashboard).to.have.been.called(1);
  });

  it("should display guest dashboard on the on DOM", () => {
    domUpdates.displayGuestDashboard();
    expect(domUpdates.displayGuestDashboard).to.have.been.called(1);
  });

  it("should display known guests on the on DOM", () => {
    domUpdates.displayKnownGuests();
    expect(domUpdates.displayKnownGuests).to.have.been.called(1);
  });

  it("should display guest modal on the on DOM", () => {
    domUpdates.viewGuestModal();
    expect(domUpdates.viewGuestModal).to.have.been.called(1);
  });

  it("should display available rooms", () => {
    domUpdates.displayAvailableRooms();
    expect(domUpdates.displayAvailableRooms).to.have.been.called(1);
  });
 
});