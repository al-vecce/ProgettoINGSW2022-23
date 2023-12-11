'use client';

export default function TableHorizontalBar({color, height}) {
  return (
    <hr className='horizontal-line' 
                    style={{
                        background: "#D9D9D9",
                        height: "2px",
                        border: "none",
                        }}
                    />
  );
}


