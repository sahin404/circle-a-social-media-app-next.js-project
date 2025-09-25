import { ScrollArea } from "@/components/ui/scroll-area";

const page = () => {
  
  return (
    <div>
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
          {tags.map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default page;
