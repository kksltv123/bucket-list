import Layout from "../components/Styled/Layout";
import Header from "../components/Common/Header";
import DetailLayout from "../components/Post/DetailLayout";

const Detail = (props) => {
  return (
    <>
      <Layout>
        <Header />
        <DetailLayout />
      </Layout>
    </>
  );
};

export default Detail;
