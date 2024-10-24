import { ReactNode } from 'react';

const KelasSiswaLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <h2>Kelas Siswa</h2>
      {children}
    </div>
  );
};

export default KelasSiswaLayout;