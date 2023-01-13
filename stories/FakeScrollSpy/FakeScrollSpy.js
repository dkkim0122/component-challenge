import './FakeScrollSpy.css'

export const createFakeScrollSpy = () => {
  const container = document.createElement('article')
  container.id = 'article'

  const nav = document.createElement('nav')
  nav.classList.add('nav')
  const navBar = `
      <a href="#home" class="nav-menu"><span>Home</span></a>
      <a href="#about" class="nav-menu"><span>About</span></a>
      <a href="#services" class="nav-menu"><span>Services</span></a>
      <a href="#portfolio" class="nav-menu"><span>Portfolio</span></a>
      <a href="#contact" class="nav-menu"><span>Contact</span></a>
  `
  nav.innerHTML = navBar

  const main = document.createElement('main')
  const mainSections = `
    <section id="home" class="section-area"><span>Home Section</span></section>
    <section id="about" class="section-area"><span>About Section</span></section>
    <section id="services" class="section-area"><span>Services Section</span></section>
    <section id="portfolio" class="section-area"><span>Portfolio Section</span></section>
    <section id="contact" class="section-area"><span>Contact Section</span></section>
  `
  main.innerHTML = mainSections

  container.appendChild(main)
  container.appendChild(nav)

  return container
}
