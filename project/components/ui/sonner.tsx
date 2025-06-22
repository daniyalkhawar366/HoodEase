'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-gray-600',
          actionButton:
            'group-[.toast]:bg-black group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-gray-200 group-[.toast]:text-black',
          error:
            'group-[.toast]:bg-red-600 group-[.toast]:text-white group-[.toast]:border-red-700',
          success:
            'group-[.toast]:bg-white group-[.toast]:text-black group-[.toast]:border-gray-200',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
