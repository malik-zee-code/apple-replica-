import FAQComp from "../Components/FAQ/FAQComp";

const FAQ = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchFaq());
  // }, [dispatch]);
  return (
    <div className="w-full min-h-full flex justify-center">
      {" "}
      <FAQComp />{" "}
    </div>
  );
};

export default FAQ;
