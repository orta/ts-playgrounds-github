#import "ViewController.h"

@implementation ViewController

- (void)awakeFromNib
{
    [super awakeFromNib];
    
    NSURLRequest *req = [NSURLRequest requestWithURL:[NSURL URLWithString:@"https://www.typescriptlang.org/play/"]];
    [self.webView loadRequest:req];
}

@end
