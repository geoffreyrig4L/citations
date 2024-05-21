"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa";

type Forms = {
  author: string;
  quote: string;
};

const updateQuote = async (quote: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/quote/${quote.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: quote.author,
        quote: quote.quote,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data = await response.json();

  return data;
};

const UpdateQuote = ({ quote, refetch }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm<Forms>();

  const onSubmit: SubmitHandler<Forms> = (data) =>
    updateQuote({ ...data, id: quote.id }).then(() => refetch());

  return (
    <>
      <Button
        color="secondary"
        size="sm"
        startContent={<FaPen />}
        variant="bordered"
        onPress={onOpen}
      >
        Modifier la citation
      </Button>
      <Modal
        backdrop={"blur"}
        isDismissable={false}
        isOpen={isOpen}
        size={"xl"}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <ModalHeader className="flex flex-col gap-1">
                  Modifier la citation
                </ModalHeader>
                <ModalBody>
                  <Input
                    defaultValue={quote?.author}
                    label="Auteur"
                    placeholder="Auteur de la citation"
                    type="text"
                    {...register("author", { required: true })}
                  />
                  <Textarea
                    defaultValue={quote?.quote}
                    label="Citation"
                    placeholder="Ecrivez la citation"
                    {...register("quote", { required: true })}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Annuler
                  </Button>
                  <Button type="submit" color="secondary" onPress={onClose}>
                    Modifier
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateQuote;
