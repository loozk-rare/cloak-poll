import { Nav } from "@/components/Nav";
import {
  Button,
  Container,
  Description,
  Form,
  FormGroup,
  Input,
  Label,
  Layout,
  Select,
  TextArea,
  Title,
} from "@/components/atoms";
import { http } from "@/utils/fetch";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAsyncMemo } from "use-async-memo";
import { erc20Abi } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";

// Page component
const CreatePollPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useAccount();

  useEffect(
    () => setFormData((data) => ({ ...data, admin: address || "" })),
    [address]
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      ...formData,
      id: Math.random().toString(36).substring(7),
    };

    await new Promise((resolve) => setTimeout(resolve, 2000));

    //TODO: interact with the PollFactory contract to create a new poll

    // try {
    //   await http({
    //     method: "POST",
    //     form: data,
    //     json: true,
    //     url: "/poll",
    //   });
    // } catch (e) {
    //   console.error(e);
    // }

    //add success message
    setIsLoading(false);
  };

  return (
    <Layout>
      <Nav />

      <Container
        as="main"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Title>Create a new Poll</Title>
        <Description>
          Once poll data is submitted, a new smart contract will be deployed to
          the blockchain. This contract will be used to manage the poll and
          collect votes.
        </Description>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Poll Title:</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter poll title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description:</Label>
            <TextArea
              id="description"
              name="description"
              placeholder="Enter poll description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="startDate">Start Date:</Label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="endDate">End Date:</Label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default CreatePollPage;
