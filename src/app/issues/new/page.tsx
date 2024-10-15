import dynamic from "next/dynamic";
import IssueFormLoader from "../_components/issue-form-loader";

const IssueForm = dynamic(() => import("../_components/issue-form"), {
  ssr: false,
  loading: () => <IssueFormLoader />,
});

const NewIssuePage = async () => {
  return <IssueForm />;
};

export default NewIssuePage;
