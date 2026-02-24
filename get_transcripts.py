import subprocess
import json

video_ids = [
    '_ERwMRB4pgE', 'KxT9StIlyeg', 'xnhQBTBJPek', 'Qjc8I01bZE8', 
    'O_OFRYE3omQ', 'SpJ5KgQa9Ww', 'QIEOwUDPo5E', 'Lf0IVAiILrk', 
    'PcUTF1gOYNs', '38VjOUsOhz4', 'hAj5OnZTSo4', 'b4-jNpoxvwc', 
    'EsqOf51DvJ0', 'BbCw16hxhbo'
]

with open('transcripts.txt', 'w') as f:
    for vid in video_ids:
        try:
            # Try getting Dutch first
            cmd = f"python3 -m youtube_transcript_api {vid} --languages nl en --format json"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            if result.returncode == 0:
                stdout_clean = result.stdout[result.stdout.find('['):]
                ts = json.loads(stdout_clean)
                if isinstance(ts, list) and len(ts) > 0 and isinstance(ts[0], list):
                    # Sometimes it wraps in double list if multiple languages requested
                    ts = ts[0]
                text = " ".join([x['text'] for x in ts])
                f.write(f"=== VIDEO: {vid} ===\n")
                f.write(text + "\n\n")
                print(f"Got {vid}")
            else:
                f.write(f"=== VIDEO: {vid} ERROR: {result.stderr} ===\n")
                print(f"Error {vid}")
        except Exception as e:
            f.write(f"=== VIDEO: {vid} ERROR: {e} ===\n")
            print(f"Exception {vid}")
