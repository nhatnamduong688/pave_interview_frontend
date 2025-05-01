import * as React from 'react';

interface SessionIdProps {
  id: string;
}

export function SessionId({ id }: SessionIdProps) {
  return (
    <h3 style={{
      width: '127px',
      height: '19px',
      fontFamily: "'Proto Mono', monospace",
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '15px',
      lineHeight: '125%',
      letterSpacing: '-0.04em',
      textTransform: 'uppercase',
      color: 'rgba(31, 41, 55, 0.88)',
      flex: 'none',
      order: 0,
      flexGrow: 0,
    }}>
      {id}
    </h3>
  );
} 