# Blog Ideas

- When switching between blogs, have an animate out/in effect, using the layout.tsx to handle the AnimatePresence, passing the state down through the page. Animation ideas:

  - Simple fade out/staggered fade in.
  - Clicking a suggested blog post will scroll you to the top while the suggested post transforms into the new post's header. The content may need to slide down from behind the header to make this seamless. The content probably works well on mobile as well. The description/first few sentences of the post may complicate things, not sure how they'd fit into things. This probably requires lots of coordination and might not be able to be done with declarative Framer. Might need imperative to sync the scroll and transform of the suggested post. As well to control the fadeout, removal of the old content, and insertion of the new content.

- Tagging vs categories needs to be worked out. I'll have 3 different categories of posts, which will have different styles:

1. Weekend blogs: short and sweet, just an update on whatever I did that weekend. Weekend is a loose term, but thats generally when I work on things.
2. Projects: longer posts detailing a project I'm working on. These will have a lot more content (both text and images), may actually be broken up into several posts (though a part 1-x is probably good enough for organization), and are generally written as a retrospective and summary of the work I did. These can be personal or professional.
3. Thought Pieces: These are generally longer than weekend blogs, but maybe not as long as projects. It's a place for me to talk about some topic that I've been thinking through. Examples:
   - How to build a company's first CD pipeline

- Tagging is probably better for relating sub-topics or posts with similar content. Possible things to tag:
  - Tag weekend posts with the project they're related to
  - Tags can include noteworthy technologies
- Might be best to wait until I have quite a few posts until I develop tagging, since then patters will start to emerge.
- If I want to continue putting PRs at the bottom of the weekend blog, there should probably be a styled component for that, instead of just a link. It can include the PR number, status, etc.
