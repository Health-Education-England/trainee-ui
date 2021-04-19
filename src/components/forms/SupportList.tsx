import React, { useEffect, useState } from "react";
import { ActionLink, Select } from "nhsuk-react-components";
import { localOfficeContacts } from "../../models/LocalOfficeContacts";

interface Props {
  contact: string;
}

export const SupportList = (props: Props) => {
  const { contact } = props;
  const [altContact, updateContact] = useState("");

  useEffect(() => {
    if (contact) {
      updateContact(contact);
    }
  }, [contact]);

  const handleChange = (event: any) => updateContact(event.target.value);

  return (
    <>
      <div>
        {altContact === "PGMDE support portal" ? (
          <ActionLink href="https://lasepgmdesupport.hee.nhs.uk/support/tickets/new?form_7=true">
            PGMDE Support Portal
          </ActionLink>
        ) : (
          <ActionLink
            href={`mailto:${altContact}?subject=Form R support query`}
          >
            {altContact}
          </ActionLink>
        )}
      </div>

      <Select onChange={handleChange}>
        <Select.Option value={contact}>
          -- Choose an alternative contact --
        </Select.Option>
        {localOfficeContacts.map((contact, index) => (
          <Select.Option key={index} value={contact.contact}>
            {contact.name}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};
