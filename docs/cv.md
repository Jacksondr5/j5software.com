# Ideas for CV

- The main benefit of the website is that I can go into more detail than a resume
- Close secondary benefit is that I can show off my skills while doing so

## General

- I want to quickly give people a top line blurb for each topic and let them deep dive into the details if they want. Number 1 goal is to let people easily find something that will hook them, and then quickly give them details if they choose to go deeper.
  - The deep dive can be a project showcase or thought piece.
- I want to steer people away from the typical CV format. They likely already have a PDF of my CV, so I don't need to restate it. I can probably have it burried somewhere for completeness sake, but the main focus needs to be on projects, thought pieces, and blogs.
- Should I list out skills? I think a show, don't tell approach is better. List out technologies and tools in the projects as a sidebar to hit key words, but don't have a dedicated section for it.
- I do still need a section to describe who I am though and give people an overview. Focus probably needs to be on "a technical leader that can drive initiatives from both a people/planning side and an implementation side". Need less corporate language for that though. People should feel excited about working with me.
- **Need to strike a balance between quickly giving information and letting people deep dive into details. Many won't want to immediately read some long blog post about a project, but if the showcase can quickly list off key technologies and has a great hook above the fold, they're more likely to stay and read it all.**

## Projects

- How should project showcases relate to project blogs? For some projects, there might be multiple blogs, but I should have a single showcase to serve as the nexus for all the content related to the project.

  - If I do that, then it should probably start with an overview of the project, including media. The overview should be brief, but give a good sense of what the project is. Details should exist in the project blogs and the project showcase should link to those.

- Project Showcases
  - Homelab. Subprojects (if that makes sense)
    - k8s setup (including NAS, ArgoCD, cert-manager, etc.)
    - GitLab + Argo Workflows
    - DNS
    - Power outage management
  - Personal Website
  - MeatNet
  - Work. This is a place to showcase the things I've done professionally.
    - CI/CD work Include AgF and TBOL.
      - Possible thought piece on what made the initiative successful. More focus on people and less on technical solution.
    - Automated Testing. Focus on architecture and project implementation, less on technical details or writing tests. Goal here is to show how I drove an initiative forward and delivered results.

## Experience

- Building the software engineer hiring pipeline at TBOL.
  - Going from no coding tests to 3 options for us to choose from
  - Conducting over 50 interviews, having a hand in hiring most of the software engineers at TBOL
  - Process was easily scaled up to have half a dozen people conducting interviews, I was able to step back and let other hiring managers take a more direct role
  - Making people feel comfortable interviewing by providing a coding test that was easy to get into, where they could focus on writing code. That code also felt more like their day to day work:
    - Using VS Code
    - Having the project already set up. No need to set up a project or other boilerplate. Could use familiar libraries (express, Mongo, React, etc.), since we didn't need to waste time on setup.
    - Focusing on real world problems: PR review, refactoring, API calls, DB, etc.
    - Written instructions because some people like those better
  - Handling the people part of the interview
    - Wrote out a script to give to everyone that made the candidate feel more at ease. Lay out the expectations up front, so they know what to expect.
  - How I would judge a candidate's skill levels
    - Looking for how easily and comfortably they can code. Does it look like they've done the simple tasks a million times?
    - Listening for how they describe their previous work? Does it sound like they really had ownership of the work they were doing, the architecture they were building, or were they just following orders?
    - How clearly could they explain a the technical desicions they made at their previous job? Are they making a choice because a library/technique is popular or are they making a choice because it's the best choice for the problem at hand?
- Enterprise component library
  - X number of components
  - Complexity ranging from colors and buttons to AI chatbots
  - Established a great working relationship between the designers, developers, and consumers to make sure that complex components could be delivered quickly and with high quality
  - Leaned heavily on automated visual regression testing to ensure stability
  - Used across 7 different front end applications
  - Close collaboration with the Chromatic team on advanced problems (turbosnap and Playwright visual regression testing)
- Automated testing
  - Problem: We have microservices and micro-frontends but still deploy as a monolith because manual testing is that hard
  - Compare old testing architecture to NTA
  - Really show how the issues aren't that we're using wrong tools (cypress), or that the architecture is wrong in a classical sense, but that it doesn't meet the needs that come from our organizational and staffing decisions. So, a new architecture is needed to adapt to our specific situation.
  - Story around pivoting from UI testing to API testing and how I made the wrong decision initially, but was able to pivot quickly and deliver results
