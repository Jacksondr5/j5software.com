export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-extrabold">Automated Testing</h1>
      <p>
        *overall thoughts of automated testing* Possibly include a link to a
        thought piece on it, maybe this is that thought piece
      </p>
      <h2>My automated testing projects</h2>
      <div>
        <h3>TBOL API testing</h3>
        <ul>
          <li>Results (TBD)</li>
          <li>Architecture</li>
          <li>
            Interesting Notes
            <ul>
              <li>Pivoting from UI to API</li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <h3>Visual Regression</h3>
        <ul>
          <li>Why? + Results</li>
          <li>Architecture</li>
          <li>Working with the Chromatic team</li>
        </ul>
      </div>
      <div>
        <h3>First automated testing with AgFirst</h3>
        <ul>
          <li>Before vs after</li>
          <li>
            Building a solution to E2E test an API in the AgF infrastructure.
            Moral of the story: you don't need the latest tech to make
            impressive things happen.
          </li>
        </ul>
      </div>
    </>
  );
}
