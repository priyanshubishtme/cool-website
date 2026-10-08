(() => {
  const data = window.LITTLE_UNIVERSE_DATA;
  const tags = (items) => `<ul class="tag-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  const facts = (items) => `<ul class="facts">${items.map((item) => `<li><strong>${item.value}</strong>${item.label}</li>`).join('')}</ul>`;
  const projectVisual = (project) => `<div class="project-visual ${project.visual}-visual" role="img" aria-label="Decorative illustration for ${project.title}"></div>`;

  function projectCard(project) {
    return `<article class="project-card">
      ${projectVisual(project)}
      <div class="project-copy">
        <p class="project-type">${project.type}</p>
        <h2>${project.title}</h2>
        <p><strong>${project.subtitle}</strong></p>
        <p>${project.description}</p>
        ${tags(project.stack)}
        ${facts(project.facts)}
        <a class="case-study-link" href="/projects/${project.slug}" data-route="/projects/${project.slug}">Open the case study <span aria-hidden="true">→</span></a>
      </div>
    </article>`;
  }

  function projects() {
    return `<p class="panel-kicker">Maker Workshop · Selected work</p>
      <h1 id="panel-title">Things I've built</h1>
      <p class="panel-lead">I like projects where many moving parts become one clear, useful experience—from the first schema to the final screen. <a href="/experience" data-route="/experience">See my current experience →</a></p>
      <div class="project-list">${data.projects.map(projectCard).join('')}</div>`;
  }

  function projectDetail(project) {
    if (!project) return notFound();
    return `<nav class="panel-breadcrumb" aria-label="Breadcrumb"><a href="/projects" data-route="/projects">Workshop</a><span aria-hidden="true">/</span><span>${project.title}</span></nav>
      <p class="panel-kicker">Project case study · ${project.type}</p>
      <h1 id="panel-title">${project.title}</h1>
      <p class="panel-lead">${project.description}</p>
      <div class="case-study-hero">${projectVisual(project)}<div><p class="project-type">At a glance</p>${facts(project.facts)}${tags(project.stack)}</div></div>
      <div class="case-study-body">
        <section><p class="section-index">01</p><div><h2>The problem</h2><p>${project.problem}</p></div></section>
        <section><p class="section-index">02</p><div><h2>The approach</h2><p>${project.solution}</p></div></section>
        <section><p class="section-index">03</p><div><h2>My role</h2><p>${project.role}</p></div></section>
        <section><p class="section-index">04</p><div><h2>Systems & trade-offs</h2><p>${project.tradeoffs}</p></div></section>
      </div>
      <div class="evidence-note"><strong>Evidence, not theatre.</strong><p>${project.links ? 'Verified source and demo links are available below.' : 'No repository, demo, screenshots, or measured result was supplied. The exhibit artwork is illustrative and is not presented as a live product demo.'}</p></div>
      <div class="panel-next"><a href="/projects" data-route="/projects">← Back to all projects</a></div>`;
  }

  function about() {
    return `<p class="panel-kicker">Story Garden · About me</p>
      <h1 id="panel-title">Learning by making</h1>
      <p class="panel-lead">I'm ${data.profile.name}, a ${data.profile.ageCopy.toLowerCase()}-year-old builder from ${data.profile.location}. I build web products, explore AI and data science, and share what I learn with people around me.</p>
      <div class="two-column">${data.profile.roles.map((role) => `<article class="info-card"><h2>${role.title}</h2><p>${role.text}</p></article>`).join('')}<article class="info-card"><h2>Where I am</h2><p>${data.profile.location}</p></article></div>
      <h2>Five chapters so far</h2>
      <div class="story-chapters">${data.story.map((chapter) => `<article class="story-chapter"><h2>${chapter.title}</h2><p>${chapter.text}</p></article>`).join('')}</div>`;
  }

  function experience() {
    const item = data.experience;
    return `<p class="panel-kicker">Workshop noticeboard · Experience</p>
      <h1 id="panel-title">Work in the real world</h1>
      <p class="panel-lead">Turning client needs into practical systems—and learning to communicate as clearly as I build.</p>
      <div class="timeline"><article><h2>${item.role} · ${item.company}</h2><p class="meta">${item.period}</p><ul>${item.responsibilities.map((entry) => `<li>${entry}</li>`).join('')}</ul></article></div>
      <div class="panel-next"><a href="/projects" data-route="/projects">Inspect the projects →</a></div>`;
  }

  function education() {
    return `<p class="panel-kicker">Learning Station · Education & skills</p>
      <h1 id="panel-title">Always in progress</h1>
      <p class="panel-lead">A formal foundation in computer applications, AI and data science—strengthened by projects, contests and persistent curiosity.</p>
      <div class="timeline">${data.education.map((item) => `<article><h2>${item.title}</h2><p class="meta">${item.institution} · ${item.period}</p><p><strong>${item.result}</strong></p></article>`).join('')}</div>
      <h2>My toolkit</h2>
      <div class="two-column">${Object.entries(data.skills).map(([level, items]) => `<article class="info-card"><h2>${level}</h2><p>${items.join(' · ')}</p></article>`).join('')}</div>`;
  }

  function achievements() {
    return `<p class="panel-kicker">Trophy Pavilion · Milestones</p>
      <h1 id="panel-title">Wins, finals & lessons</h1>
      <p class="panel-lead">The medals are nice. The better reward is learning to build, explain and adapt under pressure.</p>
      <div class="achievement-grid">${data.achievements.map((item) => `<article class="achievement${item.uncertain ? ' uncertain' : ''}"><p class="result">${item.result}</p><h2>${item.event}</h2><p>${item.detail}</p></article>`).join('')}</div>`;
  }

  function emptyState(type) {
    const books = type === 'books';
    return `<p class="panel-kicker">Library · ${books ? 'Reading shelf' : 'Writing desk'}</p>
      <h1 id="panel-title">${books ? 'Books that stay with me' : 'Notes & ideas'}</h1>
      <p class="panel-lead">${books ? 'A future home for the books I am reading and the ideas I carry away from them.' : 'A place to share ideas and have meaningful conversations.'}</p>
      <div class="empty-state">
        <svg viewBox="0 0 80 70" aria-hidden="true">${books ? '<path d="M7 13c13-2 24 1 33 9v41c-9-8-20-11-33-9zM73 13c-13-2-24 1-33 9v41c9-8 20-11 33-9zM40 22v41"/>' : '<path d="M17 8h46v54H17zM27 23h26M27 34h26M27 45h17M58 56l11-31 5 2-11 31-7 7z"/>'}</svg>
        <h2>${books ? 'My reading shelf is coming soon' : 'The first note is still being written'}</h2>
        <p>${books ? 'This shelf stays honest: real titles, real reading status and my own takeaways will appear when they are ready.' : 'No filler posts or invented publication dates. When I have something useful to say, it will live here.'}</p>
      </div>
      <p class="panel-next"><a href="/${books ? 'notes' : 'books'}" data-route="/${books ? 'notes' : 'books'}">${books ? 'Cross the library to the writing desk' : 'Visit the reading shelf'} →</a></p>`;
  }

  function contact() {
    return `<p class="panel-kicker">Post Office · Contact</p>
      <h1 id="panel-title">Let's start a conversation</h1>
      <p class="panel-lead">Have a project, an idea, a question, or simply want to say hello? My inbox is open.</p>
      <div class="contact-options">
        <article class="email-card"><h2>Send me a letter</h2><p>This opens your email app with a draft. Nothing is sent until you choose to send it.</p><a class="email-address" href="mailto:${data.profile.email}?subject=Hello%20Priyanshu">${data.profile.email}</a><br><a class="panel-button" href="mailto:${data.profile.email}?subject=Let's%20build%20something">Open email draft</a></article>
        <div><h2>Find me online</h2><div class="social-list">${data.social.map((item) => `<a href="${item.url}" target="_blank" rel="noreferrer">${item.label} <span aria-hidden="true">↗</span></a>`).join('')}</div></div>
      </div>
      <div class="guide-box"><p class="panel-kicker">Little Universe Help Desk</p><h2>Ask me something real.</h2><div class="prompt-list"><button type="button" data-guide-action="work">What do you do?</button><button type="button" data-guide-action="drives">What drives you?</button><button type="button" data-guide-action="stack">What is your tech stack?</button><button type="button" data-guide-action="skills">What are you learning?</button><button type="button" data-guide-action="purpose">What is your purpose?</button><button type="button" data-guide-action="future">Where do you see yourself in 5 years?</button><button type="button" data-guide-action="motivation">What keeps you motivated?</button></div></div>`;
  }

  function bus() {
    const stops = [
      ['/projects', 'Maker Workshop'], ['/books', 'Library'], ['/about', 'Story Garden'],
      ['/achievements', 'Trophy Pavilion'], ['/education', 'Learning Station'], ['/contact', 'Post Office']
    ];
    return `<div class="bus-menu"><p class="panel-kicker">Town Loop · All stops</p><h1 id="panel-title">Where to?</h1><p class="panel-lead">Pick a stop for a short ride, or use any direct navigation control for instant travel.</p><div class="bus-stops">${stops.map(([route, label]) => `<button type="button" data-bus-stop="${route}">${label}<small>Ride there</small></button>`).join('')}</div></div>`;
  }

  function notFound() {
    return `<p class="panel-kicker">Beyond the town map · 404</p><h1 id="panel-title">This path goes nowhere—yet.</h1><p class="panel-lead">The destination at this address does not exist. The town is still here, and every verified place remains available.</p><div class="empty-state"><h2>Return to a known path</h2><p><a href="/projects" data-route="/projects">Visit the Workshop</a> · <a href="/about" data-route="/about">Read the story</a> · <a href="/contact" data-route="/contact">Go to the Post Office</a></p></div>`;
  }

  window.LITTLE_UNIVERSE_VIEWS = Object.freeze({ projects, projectDetail, about, experience, education, achievements, emptyState, contact, bus, notFound });
})();
