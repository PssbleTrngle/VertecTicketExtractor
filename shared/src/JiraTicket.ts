type JiraTicket = {
  key: string;
  fields: {
    parent?: JiraTicket;
    summary: string;
    labels: string[];
    issuetype: {
      name: string;
    };
  };
};

export default JiraTicket;
