import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClientCardProps {
  avatarimg: any;
  title: string | undefined;
  subtitle: string | undefined;
}

export function ClientCard({ avatarimg, title, subtitle }: ClientCardProps) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar className="h-10 w-10 2xl:h-13 2xl:w-13">
        {avatarimg?.src ? (
          <AvatarImage src={avatarimg.src} />
        ) : (
          <AvatarFallback className="h-10 w-10 2xl:h-13 2xl:w-13">
            <p>CN</p>
          </AvatarFallback>
        )}
      </Avatar>
      {true && (
        <div className="flex flex-col py-2 items-start">
          <span className="text-xs 2xl:text-[18px] text-textColor-base font-semibold">
            {title}
          </span>
          <span className="text-[9px] 2xl:text-[12px] text-textColor-400">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
}
