function AboutContent() {
    return (
        <>
        <h3>ABOUT</h3>

        <h3>a community sourced, intellectual blog</h3>

        <p>
            <strong>{/*"An ideashare platform"*/} that uses a tokenomics system to incentivize original 
            content</strong>
        </p>
        <h3>THE VISION</h3>
        <p>
            An intellecutally focused blog that allows readers and authors to attach
            token incentives for content creation. Think <a href="https://lesswrong.com">LessWrong</a>, but with the 
            ability to prompt, sponsor, vote, and tokenize posts and ideas.
        </p>
        <p>
            The vision is to have a rich ideashare ecosystem that is not only fueled by passion, but
            by financial incentives. Authors with high level technical or otherwise esoteric knowledge
            would be able to compete with one another for prompt bounties, as well as status within the
            community.  Ideas that would otherwise never be shared, or new solutions or ways of looking
            at things can become commonplace. Voting power would reside within the community, more specifically,
            those who have added bounties to posts.
        </p>

        <h5>TODO:</h5>
        <ul>
            <li>overhaul frontend with clojurescript, reagent-react, and tailwind</li>
            <ul>
                <li>more elegant, efficient and maintainable code</li>
                <li>add post archival system, sort by tags, date, author</li>
                <li>edit posts, create comments</li>
                <li>more fleshed out user profiles and UI</li>
                <li>add sublime graphics and animations</li>
            </ul>

            <li>introduce tokenization mechanics</li>
            <ul>
                <li>readers/authors can prompt certain posts, or their own posts</li>
                <li>readers can add cash bounty prizes to posts</li>
                <li>post voting for most profound content</li>
                <li>tipping mechanism for exceptional content</li>
            </ul>
            <li></li>
        </ul>
        </>
    );
}

export default AboutContent;
