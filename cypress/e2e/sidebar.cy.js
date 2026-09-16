/**
 * Smoke tests for the admin sidebar (Cypress).
 *
 * The app builds its route table from localStorage at boot, and there is no
 * seeded e2e user, so the session is injected in onBeforeLoad - which runs
 * before the app scripts, so the router sees the token on first render.
 */
const TOKEN = { token_type: 'Bearer', access_token: 'e2e-token', expires_at: null }
const USER = {
  id: 1,
  firstname: 'E2E',
  lastname: 'Runner',
  avatar_url: null,
  people: { firstname: 'E2E', lastname: 'Runner' },
  roles: [{ id: 1, name: 'Super' }],
}

const boot = () =>
  cy.visit('/#/dashboard', {
    onBeforeLoad(win) {
      win.localStorage.clear()
      win.localStorage.setItem('token', JSON.stringify(TOKEN))
      win.localStorage.setItem('user', JSON.stringify(USER))
    },
  })

// row order: 0 dashboard, 1 attendance, 2 officer, 3 usersalaryadjustment,
//            4 payroll, 5 setting, 6 rail toggle, 7 logout
const ATTENDANCE = 1

describe('admin sidebar', () => {
  it('renders the attendance group', () => {
    boot()
    cy.get('.sidebar .sidebar-item').should('have.length', 8)
    cy.get('.sidebar .sidebar-item')
      .eq(ATTENDANCE)
      .find('.item-label')
      .should('have.text', 'វត្តមាន')
  })

  it('toggles its submenu on click', () => {
    boot()
    cy.get('.sidebar .sidebar-item').eq(ATTENDANCE).as('row')
    cy.get('@row').find('.sidebar-children').should('not.be.visible')
    cy.get('@row').find('.item-content').click()
    cy.get('@row').find('.sidebar-children').should('be.visible')
    cy.get('@row').find('.item-caret').should('have.class', 'item-caret-open')
    cy.get('@row')
      .find('.child-item-label')
      .should('have.length', 2)
  })

  it('gives every item its own colour on icon and label', () => {
    boot()
    cy.get('.sidebar .sidebar-item').then(($rows) => {
      const colors = [...$rows].map((el) => getComputedStyle(el).color)
      expect(colors).to.have.length(8)
      expect(new Set(colors).size).to.equal(8)
    })
    cy.get('.sidebar .sidebar-item').eq(ATTENDANCE).as('row')
    cy.get('@row').then(($row) => {
      const rowColor = getComputedStyle($row[0]).color
      expect(rowColor).to.equal('rgb(5, 150, 105)')
      expect(getComputedStyle($row.find('.item-icon')[0]).color).to.equal(rowColor)
      expect(getComputedStyle($row.find('.item-label')[0]).color).to.equal(rowColor)
      expect(getComputedStyle($row.find('.item-icon svg')[0]).color).to.equal(rowColor)
    })
    // children inherit the group colour
    cy.get('@row').find('.item-content').click()
    cy.get('@row').then(($row) => {
      const rowColor = getComputedStyle($row[0]).color
      const childColor = getComputedStyle($row.find('.child-item-label')[0]).color
      expect(childColor).to.equal(rowColor)
    })
  })

  it('collapses to an icon rail and shifts page content', () => {
    boot()
    cy.get('.sidebar').should('not.have.class', 'sidebar-collapsed')
    cy.get('.sidebar .sidebar-item[title] .item-content').click()
    cy.get('.sidebar').should('have.class', 'sidebar-collapsed')
    cy.get('body').should('have.class', 'sidebar-rail-collapsed')
    cy.get('.left-40')
      .first()
      .then(($el) => expect(Math.round($el[0].getBoundingClientRect().left)).to.equal(48))
  })
})
