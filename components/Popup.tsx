interface PopupProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const Popup = ({ title, children, action }: PopupProps) => {
  return (
    <div className="fixed inset-0 bg-black text-white bg-opacity-50 flex items-center justify-center z-50 rounded-lg h-[100vh] overflow-y-auto">
      <div className="shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="p-4 space-y-4">{children}</div>
        <div className="flex justify-end gap-2 p-4 border-t">
          <>{action}</>
        </div>
      </div>
    </div>
  );
};

export default Popup;
