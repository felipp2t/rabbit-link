import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormItem } from "../ui/form";
import { Input } from "../ui/input";

export function SearchInput() {
  const valueValidation = z.object({
    value: z.string(),
  });

  type Value = z.infer<typeof valueValidation>;

  const form = useForm<Value>({
    resolver: zodResolver(valueValidation),
  });

  return (
    <div className="w-1/3">
      <Form {...form}>
        <form>
          <Controller
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center rounded-md bg-muted p-1 pr-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring">
                  <Input
                    {...field}
                    className="h-8 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="procure seu serviço..."
                  />
                  <Search className="size-6 cursor-pointer text-primary" />
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
