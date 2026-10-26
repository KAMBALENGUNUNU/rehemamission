import { useState } from 'react';
import { Send, Check } from 'lucide-react';

const mockCustomers = [
  { id: 1, name: 'Aisha Kaliza', phone: '+250 788 111 222' },
  { id: 2, name: 'Claire Mukamana', phone: '+250 788 333 444' },
  { id: 3, name: 'Diane Uwase', phone: '+250 788 555 666' },
  { id: 4, name: 'Grace Iradukunda', phone: '+250 788 777 888' },
  { id: 5, name: 'Marie Ingabire', phone: '+250 788 999 000' },
];

export default function AdminCampaigns() {
  const [selected, setSelected] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const toggleAll = () => {
    setSelected(selected.length === mockCustomers.length ? [] : mockCustomers.map((c) => c.id));
  };

  const toggle = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setMessage('');
    setSelected([]);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="page-enter">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-light text-ink-900">Campaigns</h1>
        <p className="text-sm text-amber-600 mt-2 flex items-center gap-1.5">
          <span className="px-2 py-0.5 bg-amber-100 text-xs tracking-wide uppercase">Prototype</span>
          Simulated sending — no real WhatsApp API connected
        </p>
      </div>

      {sent && (
        <div className="mb-6 p-4 bg-sage-100 border border-sage-300 text-sage-700 text-sm flex items-center gap-2 animate-fade-up">
          <Check className="w-4 h-4" /> Campaign sent to selected customers (simulated).
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer selection */}
        <div className="bg-white border border-ink-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-light text-ink-900">Select Customers</h2>
            <button onClick={toggleAll} className="text-xs tracking-wide uppercase text-champagne-600 hover:text-champagne-700">
              {selected.length === mockCustomers.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div className="space-y-2">
            {mockCustomers.map((c) => (
              <label key={c.id} className="flex items-center gap-3 p-3 border border-ink-50 hover:bg-champagne-50/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={selected.includes(c.id)}
                  onChange={() => toggle(c.id)}
                  className="w-4 h-4 accent-champagne-600"
                />
                <div>
                  <p className="text-sm text-ink-900">{c.name}</p>
                  <p className="text-xs text-ink-400">{c.phone}</p>
                </div>
              </label>
            ))}
          </div>
          <p className="text-xs text-ink-400 mt-4">{selected.length} selected</p>
        </div>

        {/* Message composer */}
        <div className="bg-white border border-ink-100 p-6">
          <h2 className="font-serif text-xl font-light text-ink-900 mb-4">Message Composer</h2>
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <textarea
                required
                rows={6}
                maxLength={1000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your campaign message..."
                className="input-field resize-none"
              />
              <div className="flex justify-between mt-1.5">
                <p className="text-xs text-ink-400">*bold* _italic_ ~strikethrough~</p>
                <p className="text-xs text-ink-400">{message.length}/1000</p>
              </div>
            </div>
            <button
              type="submit"
              disabled={selected.length === 0 || !message}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
              Send Campaign
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
