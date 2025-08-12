interface Props {
  email: string;
}

export const UserEmailViewComponent = ({ email }: Props) => {
  return (
    <div className="w-1/2 flex items-baseline gap-2">
      <p>Email Address</p>
      <p className="text-gray-500">{email}</p>
    </div>
  );
};
