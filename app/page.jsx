import Feed from "@components/Feed"

const Home = () => {
    return (
        <section className="w-full flex center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden"/>
                <span className="orange_gradient text-center"> AI powered prompts</span>
            </h1>
            <p className="desc text-center mx-[30%]">
                prompter provides you pre-made prompts to use on chat gpt
            </p>

            <Feed/>
        </section>
    )
}

export default Home