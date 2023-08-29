function RecipeDetails(props: { id: string }) {

    const { id } = props;
    console.log(id);
    return (<>{id}</>);
}
export default RecipeDetails;